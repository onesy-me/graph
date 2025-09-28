
</br>
</br>

<p align='center'>
  <a target='_blank' rel='noopener noreferrer' href='#'>
    <img width='auto' height='84' src='https://raw.githubusercontent.com/onesy-me/onesy/refs/heads/main/utils/images/logo.png' alt='onesy logo' />
  </a>
</p>

<h1 align='center'>onesy Graph</h1>

<h3 align='center'>
  <sub>MIT license&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Production ready&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>UMD 2.2kb gzipped&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>100% test cov&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Browser and Nodejs</sub>
</h3>

<p align='center'>
  <sub>Very simple code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Modern code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Junior friendly&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Typescript&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Made with :yellow_heart:</sub>
</p>

<br />

### Add

```sh
yarn add @onesy/graph
```

### Use cases
- Social media network
- Maps, roads connections, GPS
- Search result relevancy algorithm
- etc.

### Use

```javascript
  import OnesyGraph from '@onesy/graph';

  // Make a new graph instance
  const onesyGraph = new OnesyGraph({ weighted: true });

  // Add nodes
  onesyGraph
    .addNode('a')
    .addNode('b')
    .addNode('c')
    .addNode('d')
    .addNode('e')
    .addNode('f')
    .addNode('g');

  // Add connections
  onesyGraph
    .addConnection('a', 'b', 2)
    .addConnection('a', 'c', 7)
    .addConnection('b', 'd', 5)
    .addConnection('c', 'd', 7)
    .addConnection('d', 'e', 14)
    .addConnection('d', 'f', 11)
    .addConnection('e', 'f', 4)
    .addConnection('f', 'g', 2)
    .addConnection('e', 'g', 4);

  // matrix
  onesyGraph.array;

  // [
  //      a  b  c  d  e  f  g
  //   a [0, 2, 7, 0, 0, 0, 0],
  //   b [2, 0, 0, 5, 0, 0, 0],
  //   c [7, 0, 0, 7, 0, 0, 0],
  //   d [0, 5, 7, 0, 14, 11, 0],
  //   e [0, 0, 0, 14, 0, 4, 4],
  //   f [0, 0, 0, 11, 4, 0, 2],
  //   g [0, 0, 0, 0, 4, 2, 0]
  // ]

  // Shortest path
  onesyGraph.shortestPath('a', 'g');

  // {
  //   distance: 20,
  //   path: 'a-b-d-f-g'
  // }
```

### Dev

Install

```sh
yarn
```

Test

```sh
yarn test
```

### Prod

Build

```sh
yarn build
```
