import { getResourcesService } from "../services/resourceService.js"

export async function getResources(req, res) {

  try {

    const resources = await getResourcesService()

    res.status(200).json(resources)

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: err.message
    })

  }

}