
</br >
</br >

<p align='center'>
  <a target='_blank' rel='noopener noreferrer' href='#'>
    <img src='utils/images/logo.svg' alt='amaui logo' />
  </a>
</p>

<h1 align='center'>amaui Graph</h1>

<p align='center'>
  Graph
</p>

<br />

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

## Getting started

### Add

```sh
  yarn add @amaui/graph
```

### Use cases
- Social media network
- Maps, roads connections, GPS
- Search result relevancy algorithm
- etc.

### Use

```javascript
  import AmauiGraph from '@amaui/graph';

  // Make a new graph instance
  const amauiGraph = new AmauiGraph({ weighted: true });

  // Add nodes
  amauiGraph
    .addNode('a')
    .addNode('b')
    .addNode('c')
    .addNode('d')
    .addNode('e')
    .addNode('f')
    .addNode('g');

  // Add connections
  amauiGraph
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
  amauiGraph.array;
  // [
  //   [ 0, 2, 7, 0, 0, 0, 0 ],
  //   [ 2, 0, 0, 5, 0, 0, 0 ],
  //   [ 7, 0, 0, 7, 0, 0, 0 ],
  //   [ 0, 5, 7, 0, 14, 11, 0 ],
  //   [ 0, 0, 0, 14, 0, 4, 4 ],
  //   [ 0, 0, 0, 11, 4, 0, 2 ],
  //   [ 0, 0, 0, 0, 4, 2, 0 ]
  // ]

  // Shortest path
  amauiGraph.shortestPath('a', 'g');

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
