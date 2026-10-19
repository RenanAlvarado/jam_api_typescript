import type { Repository } from "typeorm";

import database from "../../config/database.config";
import Address from "./address.entity";
import type { AddressResponseDTO } from "./dto/address-response.dto";
import type { CreateAddressDTO } from "./dto/create-address.dto";
import viaCepService from "../viaCep/viacep.service";
import type { ViaCepResponseDTO } from "../viaCep/dto/viacep-response.dto";
import generateMapsUrl from "../../utils/maps";
import AppError from "../../errors/AppError";
import { UpdateAddressDTO } from "./dto/update-address.dto";

class AddressService {
  // Dependencies
  private get addressRepository(): Repository<Address> {
    return database.getRepository(Address);
  }

  // Criar endereço
  async store(createAddressDTO: CreateAddressDTO): Promise<AddressResponseDTO> {
    const { place_name, number, zip_code, complement } = createAddressDTO;

    // Buscar dados oficiais pelo CEP
    const cepData = await viaCepService.find(zip_code);

    // Gerar URL do Google Maps
    const mapsUrl = generateMapsUrl({
      street: cepData.logradouro,
      number,
      district: cepData.bairro,
      city: cepData.localidade,
      state: cepData.uf,
    });

    // Criar entidade
    const address = this.addressRepository.create({
      place_name,
      street: cepData.logradouro,
      number,
      district: cepData.bairro,
      city: cepData.localidade,
      state: cepData.uf,
      zip_code: cepData.cep,
      complement: complement ?? null,
      maps_url: mapsUrl,
    });

    // Salvar endereço
    const savedAddress = await this.addressRepository.save(address);

    // Retornar DTO de resposta
    return this.toResponseDTO(savedAddress);
  }

  // Buscar endereço por ID
  async show(id: number): Promise<AddressResponseDTO> {
    const address = await this.findEntityById(id);

    return this.toResponseDTO(address);
  }

  // Search Address by CEP in ViaCEP
  async findByCep(zip_code: string): Promise<ViaCepResponseDTO> {
    return viaCepService.find(zip_code);
  }

  // Atualizar endereço
  async update(
    id: number,
    updateAddressDTO: UpdateAddressDTO,
  ): Promise<AddressResponseDTO> {
    const address = await this.findEntityById(id);

    const { place_name, number, zip_code, complement } = updateAddressDTO;

    // Atualizar nome do local
    if (place_name !== undefined) {
      address.place_name = place_name;
    }

    // Atualizar número do endereço
    if (number !== undefined) {
      address.number = number;
    }

    // Atualizar dados derivados caso o CEP seja informado
    if (zip_code !== undefined) {
      const cepData = await viaCepService.find(zip_code);

      address.street = cepData.logradouro;
      address.district = cepData.bairro;
      address.city = cepData.localidade;
      address.state = cepData.uf;
      address.zip_code = cepData.cep;
    }

    // Atualizar complemento, permitindo definir null
    if (complement !== undefined) {
      address.complement = complement;
    }

    // Regenerar URL se o CEP ou número tiver sido alterado
    if (zip_code !== undefined || number !== undefined) {
      address.maps_url = generateMapsUrl({
        street: address.street,
        number: address.number,
        district: address.district,
        city: address.city,
        state: address.state,
      });
    }

    // Salvar alterações
    const updatedAddress = await this.addressRepository.save(address);

    // Retornar DTO de resposta
    return this.toResponseDTO(updatedAddress);
  }

  // Excluir endereço
  async delete(id: number): Promise<void> {
    const address = await this.findEntityById(id);

    await this.addressRepository.remove(address);
  }

  // Converter entidade para DTO de resposta
  private toResponseDTO(address: Address): AddressResponseDTO {
    return {
      id: address.id,
      place_name: address.place_name,
      street: address.street,
      number: address.number,
      district: address.district,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      complement: address.complement,
      maps_url: address.maps_url,
    };
  }

  // Buscar entidade de endereço por ID
  private async findEntityById(id: number): Promise<Address> {
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) {
      throw new AppError("Endereço não encontrado.", 404);
    }

    return address;
  }
}

export default new AddressService();
