export const makeRequest = async (path: string, values: {
    first_name? : string,
    last_name? : string, 
    email: string,
    password: string,
}): Promise<{} | null> => {
    try {
        const res = await fetch(`http://356f-78-90-52-121.ngrok.io/api/${path}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(values),
        });
        const data = await res.json();
        console.log(data);
        return data;
      } catch (e: any) {
        console.log("Error");
        console.log(e);
        return null;
      }
}