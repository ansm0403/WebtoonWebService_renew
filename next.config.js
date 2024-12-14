/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns : [
            {
                protocol : 'https',
                hostname : 'kr-a.kakaopagecdn.com',
            },
            {
                protocol : 'https',
                hostname : 'image-comic.pstatic.net',
            }
        ]
    }
}

module.exports = nextConfig

// module.exports = {
//     images:{
//              remotePatterns : [
//                     {
//                         protocol : 'https',
//                         hostname : 'i.namu.wiki',
//                     }
//                 ]
//             }
// }

// const withVideos = require("next-videos");
// module.exports = withVideos();