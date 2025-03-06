import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn : false,
    apiVersion : '2025-01-01',
    token : process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
})