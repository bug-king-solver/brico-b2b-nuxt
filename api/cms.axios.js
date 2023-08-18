import axios from "axios";

const baseDomain = process.env.VUE_APP_BASE_URL_CMS || "http://cms.crowdechain.com";

export const customHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const baseUrl = `${baseDomain}`;
export const currentDemo = 4;

export default axios.create({
  baseUrl,
  headers: customHeader,
});
