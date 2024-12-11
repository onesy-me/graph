/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate } from '../utils/js/test/utils';

import OnesyGraph from '../src';

group('OnesyGraph', () => {

  to('OnesyGraph', async () => {
    const value = new OnesyGraph();

    value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

    value.addConnection('a', 'b').addConnection('a', 'c').addConnection('b', 'd').addConnection('c', 'd').addConnection('d', 'e').addConnection('d', 'f').addConnection('e', 'f').addConnection('f', 'g').addConnection('e', 'g');

    const valueBrowsers = await evaluate((window: any) => {
      const value = new window.OnesyGraph();

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b').addConnection('a', 'c').addConnection('b', 'd').addConnection('c', 'd').addConnection('d', 'e').addConnection('d', 'f').addConnection('e', 'f').addConnection('f', 'g').addConnection('e', 'g');

      return [value.adjacency, value.nodes, value.connections];
    });
    const valueNode = [value.adjacency, value.nodes, value.connections];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        "a": ["b", "c"],
        "b": ["a", "d"],
        "c": ["a", "d"],
        "d": ["b", "c", "e", "f"],
        "e": ["d", "f", "g"],
        "f": ["d", "e", "g"],
        "g": ["f", "e"]
      },
      7,
      18
    ]));
  });

  group('onesyGraph', async () => {

    to('nodes', async () => {
      const value = new OnesyGraph();

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b').addConnection('a', 'c').addConnection('b', 'd').addConnection('c', 'd').addConnection('d', 'e').addConnection('d', 'f').addConnection('e', 'f').addConnection('f', 'g').addConnection('e', 'g');

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph();

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b').addConnection('a', 'c').addConnection('b', 'd').addConnection('c', 'd').addConnection('d', 'e').addConnection('d', 'f').addConnection('e', 'f').addConnection('f', 'g').addConnection('e', 'g');

        return [value.nodes];
      });
      const valueNode = [value.nodes];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([7]));
    });

    to('connections', async () => {
      const value = new OnesyGraph();

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b').addConnection('a', 'c').addConnection('b', 'd').addConnection('c', 'd').addConnection('d', 'e').addConnection('d', 'f').addConnection('e', 'f').addConnection('f', 'g').addConnection('e', 'g');

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph();

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b').addConnection('a', 'c').addConnection('b', 'd').addConnection('c', 'd').addConnection('d', 'e').addConnection('d', 'f').addConnection('e', 'f').addConnection('f', 'g').addConnection('e', 'g');

        return [value.connections];
      });
      const valueNode = [value.connections];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([18]));
    });

    to('array', async () => {
      const value = new OnesyGraph();

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b').addConnection('a', 'c').addConnection('b', 'd').addConnection('c', 'd').addConnection('d', 'e').addConnection('d', 'f').addConnection('e', 'f').addConnection('f', 'g').addConnection('e', 'g');

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph();

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b').addConnection('a', 'c').addConnection('b', 'd').addConnection('c', 'd').addConnection('d', 'e').addConnection('d', 'f').addConnection('e', 'f').addConnection('f', 'g').addConnection('e', 'g');

        return value.array;
      });
      const valueNode = value.array;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [0, 1, 1, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 1, 1],
        [0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0]
      ]));
    });

    to('weighted', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        return value.array;
      });
      const valueNode = value.array;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [0, 2, 7, 0, 0, 0, 0],
        [2, 0, 0, 5, 0, 0, 0],
        [7, 0, 0, 7, 0, 0, 0],
        [0, 5, 7, 0, 14, 11, 0],
        [0, 0, 0, 14, 0, 4, 4],
        [0, 0, 0, 11, 4, 0, 2],
        [0, 0, 0, 0, 4, 2, 0]
      ]));
    });

    to('addNode', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        return [value.adjacency, value.nodes];
      });
      const valueNode = [value.adjacency, value.nodes];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        {
          "a": [["b", 2], ["c", 7]],
          "b": [["a", 2], ["d", 5]],
          "c": [["a", 7], ["d", 7]],
          "d": [["b", 5], ["c", 7], ["e", 14], ["f", 11]],
          "e": [["d", 14], ["f", 4], ["g", 4]],
          "f": [["d", 11], ["e", 4], ["g", 2]],
          "g": [["f", 2], ["e", 4]]
        },
        7
      ]));
    });

    to('addConnection', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        return value.array;
      });
      const valueNode = value.array;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [0, 2, 7, 0, 0, 0, 0],
        [2, 0, 0, 5, 0, 0, 0],
        [7, 0, 0, 7, 0, 0, 0],
        [0, 5, 7, 0, 14, 11, 0],
        [0, 0, 0, 14, 0, 4, 4],
        [0, 0, 0, 11, 4, 0, 2],
        [0, 0, 0, 0, 4, 2, 0]
      ]));
    });

    to('updateConnection', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      value.updateConnection('a', 'b', 4);

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        value.updateConnection('a', 'b', 4);

        return value.array;
      });
      const valueNode = value.array;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [0, 4, 7, 0, 0, 0, 0],
        [4, 0, 0, 5, 0, 0, 0],
        [7, 0, 0, 7, 0, 0, 0],
        [0, 5, 7, 0, 14, 11, 0],
        [0, 0, 0, 14, 0, 4, 4],
        [0, 0, 0, 11, 4, 0, 2],
        [0, 0, 0, 0, 4, 2, 0]
      ]));

    });

    to('removeNode', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      value.removeNode('a');

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        value.removeNode('a');

        return value.array;
      });
      const valueNode = value.array;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [0, 0, 5, 0, 0, 0],
        [0, 0, 7, 0, 0, 0],
        [5, 7, 0, 14, 11, 0],
        [0, 0, 14, 0, 4, 4],
        [0, 0, 11, 4, 0, 2],
        [0, 0, 0, 4, 2, 0]
      ]));
    });

    to('removeConnection', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      value.removeConnection('a', 'b');

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        value.removeConnection('a', 'b');

        return value.array;
      });
      const valueNode = value.array;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [0, 0, 7, 0, 0, 0, 0],
        [0, 0, 0, 5, 0, 0, 0],
        [7, 0, 0, 7, 0, 0, 0],
        [0, 5, 7, 0, 14, 11, 0],
        [0, 0, 0, 14, 0, 4, 4],
        [0, 0, 0, 11, 4, 0, 2],
        [0, 0, 0, 0, 4, 2, 0]
      ]));
    });

    to('shortestPath', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        return [value.shortestPath('a', 'g')];
      });
      const valueNode = [value.shortestPath('a', 'g')];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        {
          "distance": 20,
          "path": "a-b-d-f-g"
        }
      ]));
    });

    to('bfs', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      const response = [];

      value.bfs('a', item => response.push(item));

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        const response = [];

        value.bfs('a', item => response.push(item));

        return response;
      });
      const valueNode = response;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        "a",
        ["b", 2],
        ["c", 7],
        ["d", 5],
        ["e", 14],
        ["f", 11],
        ["g", 4]
      ]));
    });

    to('dfs', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      const response = [];

      value.dfs('a', item => response.push(item));

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        const response = [];

        value.dfs('a', item => response.push(item));

        return response;
      });
      const valueNode = response;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        "a",
        ["c", 7],
        ["d", 7],
        ["f", 11],
        ["g", 2],
        ["e", 4],
        ["b", 5]
      ]));
    });

    to('clear', async () => {
      const value = new OnesyGraph({ weighted: true });

      value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

      value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

      const valueBrowsers = await evaluate((window: any) => {
        const value = new window.OnesyGraph({ weighted: true });

        value.addNode('a').addNode('b').addNode('c').addNode('d').addNode('e').addNode('f').addNode('g');

        value.addConnection('a', 'b', 2).addConnection('a', 'c', 7).addConnection('b', 'd', 5).addConnection('c', 'd', 7).addConnection('d', 'e', 14).addConnection('d', 'f', 11).addConnection('e', 'f', 4).addConnection('f', 'g', 2).addConnection('e', 'g', 4);

        return [value.array, value.clear().array];
      });
      const valueNode = [value.array, value.clear().array];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          [0, 2, 7, 0, 0, 0, 0],
          [2, 0, 0, 5, 0, 0, 0],
          [7, 0, 0, 7, 0, 0, 0],
          [0, 5, 7, 0, 14, 11, 0],
          [0, 0, 0, 14, 0, 4, 4],
          [0, 0, 0, 11, 4, 0, 2],
          [0, 0, 0, 0, 4, 2, 0]
        ],
        []
      ]));
    });

  });

});
