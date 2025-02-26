import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId : process.env.SANITY_PROJECT_ID,
    dataset : process.env.SANITY_DATASET,
    useCdn : false,
    apiVersion : '2025-01-01',
    token : process.env.SANITY_SECRET_TOKEN,
})