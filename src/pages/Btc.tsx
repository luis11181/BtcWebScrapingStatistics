import React, { useState } from "react";
//useSWR library to manage the state
import useSWR from "swr";

interface ITopData {
  result: {
    diffMax: {
      wallet: string;
      nombre: string;
      coins: number;
      diffCoins: number;
      diffPercent: number;
    }[];
    diff72h: {
      wallet: string;
      nombre: string;
      coins: number;
      diffCoins: number;
      diffPercent: number;
    }[];
    diff24h: {
      wallet: string;
      nombre: string;
      coins: number;
      diffCoins: number;
      diffPercent: number;
    }[];
    diff6h: {
      wallet: string;
      nombre: string;
      coins: number;
      diffCoins: number;
      diffPercent: number;
    }[];
    diff1h: {
      wallet: string;
      nombre: string;
      coins: number;
      diffCoins: number;
      diffPercent: number;
    }[];
  };
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

function useTop() {
  const { data, error } = useSWR<ITopData>(
    `http://localhost:3000/top`,
    fetcher
  );

  return {
    Top: data,
    isLoadingTop: !error && !data,
    isErrorTop: error,
  };
}

export function Btc() {
  const { data, error } = useSWR<string[]>("http://localhost:3000/", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const { Top, isLoadingTop, isErrorTop } = useTop();

  const TopResult = () => {
    if (isLoadingTop) {
      return <div>Loading...</div>;
    }
    if (isErrorTop) {
      return <div>Something went wrong</div>;
    }
    if (Top) {
      Top.result.diffMax.sort((a, b) =>
        a.diffPercent > b.diffPercent
          ? 1
          : b.diffPercent > a.diffPercent
          ? -1
          : 0
      );
      Top.result.diff72h.sort((a, b) =>
        a.diffPercent > b.diffPercent
          ? 1
          : b.diffPercent > a.diffPercent
          ? -1
          : 0
      );
      Top.result.diff24h.sort((a, b) =>
        a.diffPercent > b.diffPercent
          ? 1
          : b.diffPercent > a.diffPercent
          ? -1
          : 0
      );
      Top.result.diff6h.sort((a, b) =>
        a.diffPercent > b.diffPercent
          ? 1
          : b.diffPercent > a.diffPercent
          ? -1
          : 0
      );
      Top.result.diff1h.sort((a, b) =>
        a.diffPercent > b.diffPercent
          ? 1
          : b.diffPercent > a.diffPercent
          ? -1
          : 0
      );
      return (
        <div>
          <div className="row">
            <div className="col-md-8">
              <h2>Diff Max</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Wallet</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Coins</th>
                    <th scope="col">Diff Coins</th>
                    <th scope="col">Diff Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {Top.result.diffMax.map((item, index) => (
                    <tr key={index}>
                      <td>{item.wallet}</td>
                      <td>{item.nombre}</td>
                      <td>{item.coins}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2>Diff 6h</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Wallet</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Coins</th>
                    <th scope="col">Diff Coins</th>
                    <th scope="col">Diff Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {Top.result.diff6h.map((item, index) => (
                    <tr key={index}>
                      <td>{item.wallet}</td>
                      <td>{item.nombre}</td>
                      <td>{item.coins}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2>Diff 1h</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Wallet</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Coins</th>
                    <th scope="col">Diff Coins</th>
                    <th scope="col">Diff Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {Top.result.diff1h.map((item, index) => (
                    <tr key={index}>
                      <td>{item.wallet}</td>
                      <td>{item.nombre}</td>
                      <td>{item.coins}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2>Diff 72h</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Wallet</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Coins</th>
                    <th scope="col">Diff Coins</th>
                    <th scope="col">Diff Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {Top.result.diff72h.map((item, index) => (
                    <tr key={index}>
                      <td>{item.wallet}</td>
                      <td>{item.nombre}</td>
                      <td>{item.coins}</td>
                      <td>{item.diffCoins}</td>
                      <td>{item.diffPercent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2>Diff 24h</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Wallet</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Coins</th>
                    <th scope="col">Diff Coins</th>
                    <th scope="col">Diff Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {Top.result.diff24h.map((item, index) => (
                    <tr key={index}>
                      <td>{item.wallet}</td>
                      <td>{item.nombre}</td>
                      <td>{item.coins}</td>
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
      <h1>Top wallets</h1>
      <div>{TopResult()}</div>
    </div>
  );
}
