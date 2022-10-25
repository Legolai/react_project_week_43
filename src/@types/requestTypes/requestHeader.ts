import MediaType from "./mediaType";
import Method from "./method";

type RequestHeader = {
  "Content-Type"?: MediaType;
  "Accept"?: MediaType;
  "Access-Control-Allow-Methods"?: "*" | string;
} | HeadersInit;


export default RequestHeader;