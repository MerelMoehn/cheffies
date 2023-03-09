import { rest } from "msw";

const baseURL = "https://cheffies-api.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 8,
        username: "santa",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 8,
        profile_image: "https://res.cloudinary.com/duz5vkvkt/image/upload/v1/media/images/charlesdeluvio-D-vDQMTfAAU-unsp"
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];