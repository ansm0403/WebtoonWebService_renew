import { defineField, defineType } from 'sanity'

export const userType = defineType({
    title : "User",     // 스튜디오 UI에서 보는 이름.
    name : "user",      // 실제 백엔드에서 접근할 때 사용하는 이름
    type : "document",
    fields : [
        defineField({   // 닉네임
            title : 'Username', 
            name : 'username',
            type : 'string',
        }),
        defineField({
            title : "Name",
            name : 'name',
            type : 'string'
        }),
        defineField({
            title : 'Email',
            name : 'email',
            type : 'string',
        }),
        defineField({
            title : 'Image',
            name : 'image',
            type : 'string'
        }),
        defineField({
            title : 'LikeWebtoons',
            name : 'likeWebtoons',
            type : 'array',
            of : [
                {
                    type : 'reference',
                    to : [{type : 'webtoon'}]
                }
            ],
            validation : (Rule) => Rule.unique(),
        }),
        defineField({
            title : 'Comments',
            name : 'comments',
            type : 'array',
            of : [
                {
                    type : 'reference',
                    to : [{ type : 'comment' }]
                }
            ]
        })
    ]
})