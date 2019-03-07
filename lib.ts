interface VirtualDom {
  type: string;
  props: object;
  children: ReadonlyArray<VirtualDom>;
}

export function h(
  type: string,
  props: object,
  ...children: VirtualDom[]
): VirtualDom {
  return { type, props, children };
}

export function createElement(node: VirtualDom): HTMLElement | Text {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

export function changed(node1: VirtualDom, node2: VirtualDom): boolean {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === 'string' && node1 !== node2) ||
    node1.type !== node2.type
  );
}

export function updateElement(
  $parent: Node,
  newNode: VirtualDom,
  oldNode?: VirtualDom,
  index = 0
) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    debugger;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}
