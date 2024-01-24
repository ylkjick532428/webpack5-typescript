export const loadScript = (url: string, callback: Function) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        if (typeof callback === "function") {
          callback();
        }
      }
    };
  } else {
    // Others: Firefox, Safari, Chrome, and Opera
    script.onload = function () {
      if (typeof callback === "function") {
        callback();
      }
    };
  }
  script.src = url;

  if (typeof document.body.append === "function") {
    document.getElementsByTagName("body")[0].append(script);
  } else {
    document.getElementsByTagName("body")[0].appendChild(script);
  }
};
export const loadCSS = (url: string) => {
  const newSS = document.createElement("link");
  newSS.href = url;
  newSS.type = "text/css";
  newSS.rel = "stylesheet";
  newSS.media = "screen,print";
  if (typeof document.body.append === "function") {
    document.getElementsByTagName("head")[0].append(newSS);
  } else {
    document.getElementsByTagName("head")[0].appendChild(newSS);
  }
};
