

export abstract class GithubSHA256 {
  private static encoder = new TextEncoder();

  static async verifyGithubSignature(headers:any,body:any){
    const xHubSignature = `${ headers['x-hub-signature-256'] }`;
    const verifiedBody = JSON.stringify(body);
    const secret = Bun.env.GITHUB_WEBHOOK_SECRET;

    const isValid = await GithubSHA256.verifySignature(secret!, xHubSignature, verifiedBody);

    console.log({ isValid });
    return isValid;
  }
  
  private static async verifySignature(secret:string, header:string, payload:string) {
    try{
      let parts = header.split("=");
      let sigHex = parts[1];

      let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

      let keyBytes = GithubSHA256.encoder.encode(secret);
      let extractable = false;
      let key = await crypto.subtle.importKey(
          "raw",
          keyBytes,
          algorithm,
          extractable,
          [ "sign", "verify" ],
      );

      let sigBytes = GithubSHA256.hexToBytes(sigHex);
      let dataBytes = GithubSHA256.encoder.encode(payload);
      let equal = await crypto.subtle.verify(
          algorithm.name,
          key,
          sigBytes,
          dataBytes,
      );

      return equal;
    }
    catch(error){
      console.log(error);
      return false;
    }
      
  }

  private static hexToBytes(hex:string) {
      let len = hex.length / 2;
      let bytes = new Uint8Array(len);

      let index = 0;
      for (let i = 0; i < hex.length; i += 2) {
          let c = hex.slice(i, i + 2);
          let b = parseInt(c, 16);
          bytes[index] = b;
          index += 1;
      }

      return bytes;
  }
}
