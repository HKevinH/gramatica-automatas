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
    d3.select(`#${containerId}`).selectAll("*").remove();

    const width = 460;
    const height = 300;

    const treeLayout = d3.tree<TreeNode>().size([width, height - 50]);
    const root = d3.hierarchy(this.root);

    treeLayout(root);

    const svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

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
      .style("stroke", "white");

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
