import { defineField, defineType } from "sanity";

export const commentType = defineType({
    title : "Comment",
    name : "comment",
    type : "document",
    fields : [
        defineField({
            title : "Author",
            name : "author",
            type : "reference",
            to : [{ type : "user" }]
        }),
        defineField({
            title : "Webtoon",
            name : "webtoon",
            type : "reference",
            to : [{ type : "webtoon" }]
        }),
        defineField({
            title : "Body",
            name : "body",
            type : "string"
        })
    ]
})

