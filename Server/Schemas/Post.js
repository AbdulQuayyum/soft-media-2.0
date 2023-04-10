export default {
    name: 'Post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'Caption',
            title: 'Caption',
            type: 'string',
        },
        {
            name: 'Video',
            title: 'Video',
            type: 'file',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'UserID',
            title: 'UserID',
            type: 'string',
        },
        {
            name: 'PostedBy',
            title: 'PostedBy',
            type: 'PostedBy',
        },
        {
            name: 'Likes',
            title: 'Likes',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'User' }],
                },
            ],
        },
        {
            name: 'Save',
            title: 'Save',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'User' }],
                },
            ],
        },
        {
            name: 'Comments',
            title: 'Comments',
            type: 'array',
            of: [{ type: 'Comment' }],
        },
        {
            name: 'Topic',
            title: 'Topic',
            type: 'string',
        },
    ],
};
