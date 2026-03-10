import { getResources }
from "../repositories/resourceRepository.js"

export async function getResourcesService() {

  return await getResources()

}