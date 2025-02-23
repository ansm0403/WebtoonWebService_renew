import { defineField, defineType } from 'sanity'


export const commentType = defineType({
    title : 'Comment',
    name : 'comment',
    type : 'document',
    fields : [
        defineField({
            title : 'Author',
            name : 'author',
            type : 'reference',
            to : [{type : 'user'}]
        }),
        defineField({
            title : 'Comment',
            name : 'comment',
            type : 'string'
        })
    ]
})