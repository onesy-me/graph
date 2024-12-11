import { is } from '@onesy/utils';
import { TMethod } from '@onesy/models';

export type TOnesyGraphNode = string | [string, number];

export type TOnesyGraphAdjacency = Record<string, Array<TOnesyGraphNode>>;

export type TOnesyGraphDirection = 'directed' | 'undirected';

export interface IOnesyGraphShortestPath {
  distance: number;
  path: string;
}

export interface IOnesyGraphOptions {
  adjacency?: TOnesyGraphAdjacency;
  direction?: TOnesyGraphDirection;
  weighted?: boolean;
}

export default class OnesyGraph {
  public adjacency: TOnesyGraphAdjacency = {};
  public direction: TOnesyGraphDirection = 'undirected';
  public weighted = false;
  public nodes = 0;
  public connections = 0;

  public constructor(
    options: IOnesyGraphOptions = {}
  ) {
    const {
      adjacency,
      direction,
      weighted
    } = options;

    if (is('object', adjacency)) this.adjacency = adjacency;

    if (is('string', direction)) this.direction = direction;

    if (is('boolean', weighted)) this.weighted = weighted;
  }

  public get array(): Array<Array<number>> {
    // matrix
    const array = Array.from({ length: this.nodes }, () => Array.from({ length: this.nodes }, () => 0));

    const indexes = {};

    Object.keys(this.adjacency).forEach((key, index) => indexes[key] = index);

    Object.keys(this.adjacency).forEach(from => {
      const i = indexes[from];

      this.adjacency[from].forEach(to => {
        const j = indexes[this.weighted ? to[0] : to as string];

        array[i][j] = this.weighted ? to[1] as number : 1;
      });
    });

    return array;
  }

  public addNode(name: string): OnesyGraph {
    this.nodes++;

    // Adjacency
    if (!this.adjacency[name]) this.adjacency[name] = [];

    return this;
  }

  public addConnection(from: string, to: string, value: number = 1): OnesyGraph {
    // Both nodes exist
    if (this.adjacency[from] && this.adjacency[to]) {
      this.adjacency[from].push(this.weighted ? [to, value] : to);

      if (this.direction === 'undirected') {
        this.adjacency[to].push(this.weighted ? [from, value] : from);

        this.connections += 2;
      }
      else this.connections++;
    }

    return this;
  }

  public updateConnection(from: string, to: string, value: number): OnesyGraph {
    // Both nodes exist and onesyGraph is weighted
    if (this.adjacency[from] && this.adjacency[to] && this.weighted) {
      const itemFrom = this.adjacency[from].find(item => item[0] === to);

      if (Array.isArray(itemFrom)) itemFrom[1] = value;

      if (this.direction === 'undirected') {
        const itemTo = this.adjacency[to].find(item => item[0] === from);

        if (Array.isArray(itemTo)) itemTo[1] = value;
      }
    }

    return this;
  }

  public removeNode(name: string): OnesyGraph {
    if (this.adjacency[name]) {
      for (const node of this.adjacency[name]) this.removeConnection(name, (this.weighted ? node[0] : node) as string);

      delete this.adjacency[name];

      this.nodes--;

      // Clean up rest of the connections
      if (this.direction === 'directed') Object.keys(this.adjacency).forEach(from => this.removeConnection(from, name));
    }

    return this;
  }

  public removeConnection(from: string, to: string): OnesyGraph {
    if (this.adjacency[from] && this.adjacency[to]) {
      this.adjacency[from] = this.adjacency[from].filter(item => {
        const result = this.weighted ? item[0] !== to : item !== to;

        if (!result) this.connections--;

        return result;
      });

      if (this.direction === 'undirected') {
        this.adjacency[to] = this.adjacency[to].filter(item => {
          const result = this.weighted ? item[0] !== from : item !== from;

          if (!result) this.connections--;

          return result;
        });
      }
    }

    return this;
  }

  public shortestPath(from: string, to: string): IOnesyGraphShortestPath {
    const visited = {};
    const stack: Array<[TOnesyGraphNode, string]> = [];
    const distances = {};
    const paths = {};

    // Init distances values
    Object.keys(this.adjacency).forEach(key => distances[key] = undefined);

    distances[from] = 0;

    const method = (node: TOnesyGraphNode, path = '') => {
      const name = (is('string', node) ? node : this.weighted ? node[0] : node) as string;
      const weight = is('string', node) ? 0 : this.weighted ? node[1] : 1;

      // Add to visited
      if (!visited[name]) visited[name] = true;

      // Update distance including so far path value
      const distance = (paths[path] || 0) + weight;

      const newPath = `${path}${!path ? '' : '-'}${name}`;

      if (!distances[name] || distance < distances[name]) {
        distances[name] = distance;

        paths[newPath] = distance;
      }

      // Update paths
      if (!paths[newPath]) paths[newPath] = distance;

      // Remove visited node from the stack
      stack.shift();

      // Add to adjacent nodes to the stack
      this.adjacency[name].filter(item => !visited[(this.weighted ? item[0] : item) as string]).forEach(item => stack.push([item, newPath]));

      if (!!stack.length) method(...stack[0]);
    };

    if (this.adjacency[from]) method(from);

    return {
      distance: distances[to],
      path: Object.keys(paths).find(item => paths[item] === distances[to] && item.endsWith(to))
    };
  }

  public bfs(from: string, method: TMethod): OnesyGraph {
    const visited = {};
    const stack: Array<TOnesyGraphNode> = [from];

    const bfsMethod = (node: TOnesyGraphNode) => {
      const name = (this.weighted ? node[0] : node) as string;

      // Add to visited
      if (!visited[name]) {
        visited[name] = true;

        if (is('function', method)) method(node);
      }

      // Remove visited node from the stack
      stack.shift();

      // Add to adjacent nodes to the stack
      this.adjacency[name].filter(item => !visited[(this.weighted ? item[0] : item) as string]).forEach(item => stack.push(item));

      if (!!stack.length) bfsMethod(stack[0]);
    };

    if (this.adjacency[from]) bfsMethod(from);

    return this;
  }

  public dfs(from: string, method: TMethod): OnesyGraph {
    const visited = {};
    const stack: Array<TOnesyGraphNode> = [from];

    const dfsMethod = (node: TOnesyGraphNode) => {
      const name = (this.weighted ? node[0] : node) as string;

      // Add to visited
      if (!visited[name]) {
        visited[name] = true;

        if (is('function', method)) method(node);
      }

      // Remove visited node from the stack
      stack.shift();

      // Add to adjacent nodes to the stack
      this.adjacency[name].filter(item => !visited[(this.weighted ? item[0] : item) as string]).forEach(item => stack.unshift(item));

      if (!!stack.length) dfsMethod(stack[0]);
    };

    if (this.adjacency[from]) dfsMethod(from);

    return this;
  }

  public clear(): OnesyGraph {
    this.adjacency = {};
    this.nodes = 0;
    this.connections = 0;

    return this;
  }
}
