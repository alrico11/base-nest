export const FileFormData = {
    type: 'object',
    schema: {
        type: 'object',
        properties: { file: { type: 'string', format: 'binary' } }
    },
}