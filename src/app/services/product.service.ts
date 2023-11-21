import { lastValueFrom, map } from "rxjs";
import { inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export function getProducts(): Promise<unknown> {
    return lastValueFrom(inject(HttpClient).get('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products', { headers: { authorId: "5" } }).pipe(
        map((response: any) => {
            console.log(response);
            return response;
        })
    ))
}