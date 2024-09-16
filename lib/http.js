async function getData(fetchFn, url, headers = {}) {
    try {
        const response = await fetchFn(url, {headers});
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function postData(fetchFn, url, payload = {}, headers = {}) {
    try {
        const response = await fetchFn(url, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteData(fetchFn, url, headers = {}) {
    try {
        const response = await fetchFn(url, {
            method: "DELETE",
            headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export default function Http(fetchFn) {
    return {
        get: async () => await getData(fetchFn, url, headers = {}),
        post: async () => await postData(fetchFn, url, payload = {}, headers = {}),
        delete: async () => await deleteData(fetchFn, url, headers = {})
    }
}
