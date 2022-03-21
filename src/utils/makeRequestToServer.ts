export const makeAuthRequest = async (
  path: string,
  values: {
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
  }
): Promise<string | null> => {
  try {
    let formData = new FormData();
    if (values.first_name && values.last_name) {
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
    }
    formData.append("email", values.email);
    formData.append("password", values.password);

    const res = await fetch(`http://086d-78-90-52-121.ngrok.io/api/${path}`, {
      // headers: {
      //   //x-www-form-urlencoded
      //   "Content-Type": "application/json",
      // },
      mode: "cors",
      method: "POST",
      body: formData, //JSON.stringify(values),
    });
    console.log(JSON.stringify(res));

    const data = await res.json();
    console.log(data);
    return data.token;
  } catch (err: any) {
    console.log("Error");
    console.log(err);
    return null;
  }
};

export const getSelfInfo = async (token: string): Promise<[] | null> => {
  console.log("token");
  console.log(token);
  try {
    const res = await fetch(
      `http://086d-78-90-52-121.ngrok.io/api/get_self_info`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(JSON.stringify(res));

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err: any) {
    console.log("Error");
    console.log(err);
    return null;
  }
};

export const fetchAllSites = async (token: string): Promise<[] | null> => {
  try {
    const res = await fetch(
      `http://086d-78-90-52-121.ngrok.io/api/get_all_sites`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err: any) {
    console.log("Error");
    console.log(err);
    return null;
  }
};
