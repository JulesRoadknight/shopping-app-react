  export async function makeRequest(method, address, details = null) {
    const config = method === 'GET' || method === 'DELETE' ?
      {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
      :
      {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details)
      }
    await fetch(`http://localhost:4000/${address}`, config)
  }