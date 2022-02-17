import React, { useState } from "react";
//useSWR library to manage the state
import useSWR from "swr";

interface ITopData {
  result: {
    diffMax: { rango: string; diffCoins: number; diffPercent: number }[];
    diff72h: { rango: string; diffCoins: number; diffPercent: number }[];
    diff24h: { rango: string; diffCoins: number; diffPercent: number }[];
    diff6h: { rango: string; diffCoins: number; diffPercent: number }[];
    diff1h: { rango: string; diffCoins: number; diffPercent: number }[];
  };
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function BtcGeneral() {
  const { data, error } = useSWR<ITopData>("http://localhost:3000/", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const TopResult = () => {
    if (error) {
      return <div>Something went wrong</div>;
    }
    if (!error && !data) {
      return <div>Loading...</div>;
    }
    if (data) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h3>Top de diferencias max</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rango</th>
                    <th>Diferencia</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.result.diffMax.map((item) => (
                    <tr key={item.rango}>
                      <td>{item.rango}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3>Top de diferencia de 1 hora</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rango</th>
                    <th>Diferencia</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.result.diff1h.map((item) => (
                    <tr key={item.rango}>
                      <td>{item.rango}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3>Top de diferencia de 6 hora</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rango</th>
                    <th>Diferencia</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.result.diff6h.map((item) => (
                    <tr key={item.rango}>
                      <td>{item.rango}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3>Top de diferencia de 24 hora</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rango</th>
                    <th>Diferencia</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.result.diff24h.map((item) => (
                    <tr key={item.rango}>
                      <td>{item.rango}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3>Top de diferencia de 72 hora</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rango</th>
                    <th>Diferencia</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.result.diff72h.map((item) => (
                    <tr key={item.rango}>
                      <td>{item.rango}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Diferencias generales</h1>
      <div>{TopResult()}</div>
    </div>
  );
}
