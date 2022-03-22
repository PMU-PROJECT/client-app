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

    const res = await fetch(`http://d13f-78-90-52-121.ngrok.io/api/${path}`, {
      // headers: {
      //   //x-www-form-urlencoded
      //   "Content-Type": "application/json",
      // },
      mode: "cors",
      method: "POST",
      body: formData, //JSON.stringify(values),
    });
    // console.log(JSON.stringify(res));

    const data = await res.json();
    return data.token;
  } catch (err: any) {
    console.log("Error makeAuthRequest");
    console.log(err);
    return null;
  }
};

export const getSelfInfo = async (token: string): Promise<[] | null> => {
  try {
    const res = await fetch(
      `http://d13f-78-90-52-121.ngrok.io/api/get_self_info`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log("Error getSelfInfo");
    console.log(err);
    return null;
  }
};

export const fetchAllSites = async (
  token: string,
  filter: "all" | "visited" | "unvisited" = "all"
): Promise<[] | null> => {
  try {
    console.log(filter);
    const res = await fetch(
      `http://d13f-78-90-52-121.ngrok.io/api/get_all_sites?filter=${filter}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const data: { sites: [] } = await res.json();
    return data.sites;
  } catch (err: any) {
    console.log("Error fetchAllSites");
    console.log(err);
    return null;
  }
};

export const getQRCode = async (
  token: string
): Promise<{ stamp_token: string } | null> => {
  try {
    const res = await fetch(
      `http://d13f-78-90-52-121.ngrok.io/api/get_stamp_token`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log("Error getQRCode");
    console.log(err);
    return null;
  }
};

export const receiveStamp = async (token: string, stampToken: string) => {
  try {
    let formData = new FormData();
    formData.append("stamp_token", stampToken);
    console.log("Auth " + token);
    console.log("ST " + stampToken);
    const res = await fetch(
      `http://d13f-78-90-52-121.ngrok.io/api/receive_stamp`,
      {
        method: "POST",
        mode: "cors",
        body: formData,
        headers: {
          Authorization: token,
        },
      }
    );
    // const data = await res.json();
    const data2 = await res.text();
    // console.log(data);
    console.log(data2);
    return data2;
  } catch (err: any) {
    console.log("Error getQRCode");
    console.log(err);
    return null;
  }
};
