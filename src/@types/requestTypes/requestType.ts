import Method from "./method";
import RequestHeader from "./requestHeader";

interface RequestType<T> {
  url: RequestInfo | URL;
  body?: T;
  method: Method;
  header?: RequestHeader;
};

export default RequestType;