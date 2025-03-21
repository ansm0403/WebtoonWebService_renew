import { defineField, defineType } from 'sanity'


export const webtoonType = defineType({
    title : 'Webtoon',
    name : 'webtoon',
    type : 'document',
    fields : [
        defineField({
            title : "Title",
            name : 'title',
            type : 'string'
        }),
        defineField({
            title : "URL",
            name : "url",
            type : "string"
        }),
        defineField({
            title : "ThumbnailUrl",
            name : "thumbnailUrl",
            type : "string",
        }),
        defineField({
            title : "Genre",
            name : "genre",
            type : "array",
            of : [{
                type : "string"
            }]
        }),
        defineField({
            title : "LikeCount",
            name : "likeCount",
            type : "number",
        }),
        defineField({
            title : "OverallLikeCount",
            name : "overallLikeCount",
            type : "number",
        }),
        defineField({
            title : "LikeProportion",
            name : "likeProportion",
            type : "number",
        }),
        defineField({
            title : "FirstDate",
            name : "firstDate",
            type : "date",
        }),
        defineField({
            title : "DayOfWeek",
            name : "dayOfWeek",
            type : "string",
        }),
        defineField({
            title : "Platform",
            name : "platform",
            type : "string",
        }),
        defineField({
            title : 'Comments',
            name : 'comments',
            type : 'array',
            of : [
                {
                    title : 'Comment',
                    name : 'comment',
                    type : 'reference',
                    to : [{ type : 'comment'} ]
                }
            ]
        })
    ]
})