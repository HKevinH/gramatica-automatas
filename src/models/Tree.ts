import * as d3 from "d3";

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export class Tree {
  root: TreeNode;

  constructor(rootName: string = "()") {
    this.root = { name: rootName, children: [] };
  }

  static fromString(input: string): Tree {
    const stack: TreeNode[] = [];
    const tree = new Tree();
    stack.push(tree.root);

    for (const char of input) {
      if (char === "(") {
        const newNode: TreeNode = { name: "()", children: [] };
        stack[stack.length - 1].children?.push(newNode);
        stack.push(newNode);
      } else if (char === ")") {
        stack.pop();
      } else {
        stack[stack.length - 1].children?.push({ name: char });
      }
    }

    return tree;
  }

  static fromJSON(json: TreeNode): Tree {
    if (!json.name) {
      throw new Error("El JSON debe tener al menos un nodo raíz con 'name'.");
    }
    const tree = new Tree();
    tree.root = json;
    return tree;
  }

  render(containerId: string): void {
    const container = d3.select(`#${containerId}`);
    const containerWidth = container.node()?.clientWidth || 500; // Ancho del contenedor
    const containerHeight = container.node()?.clientHeight || 400; // Alto del contenedor

    // Limpiar el contenedor antes de renderizar
    container.selectAll("*").remove();

    const treeLayout = d3
      .tree<TreeNode>()
      .size([containerWidth - 100, containerHeight - 100]);
    const root = d3.hierarchy(this.root);

    treeLayout(root);

    const svg = container
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg.append("g").attr("transform", "translate(50, 50)");
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x ?? 0)
      .attr("y1", (d) => d.source.y ?? 0)
      .attr("x2", (d) => d.target.x ?? 0)
      .attr("y2", (d) => d.target.y ?? 0)
      .style("stroke", "white")
      .style("stroke-width", "2px");

    // Renderizar los nodos
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node.append("circle").attr("r", 10).style("fill", "lightblue");

    node
      .append("text")
      .attr("dy", -15)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .text((d) => d.data.name);
  }
}
