export const filterString = (value: string) => {
    const values: {[index: string]: string} = {
        true: 'Yes',
        false: 'No'
    }

    return ['true', 'false'].indexOf(value) === -1 ? value : values[value]
}