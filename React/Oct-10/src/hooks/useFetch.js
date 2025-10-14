export async function useFetch({
    url = '',
    body = null,
    method = 'GET',
    header = {}
}) {
    const res = await fetch(`http://localhost:3000${url}`, {
        body,
        method,
        headers: {
            ...header
        }
    })

    const data = await res.json()

    return data;
}