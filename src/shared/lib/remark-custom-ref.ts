// src/lib/remark-custom-ref.ts
import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Text, Parent } from 'mdast';

/**
 * 一个自定义的 remark 插件，用于将 <ref>X</ref> 标签转换为
 * 带有特殊标记的文本节点，方便后续在 React 组件中处理。
 */
export const remarkCustomRef: Plugin = () => {
    return (tree) => {
        visit(tree, 'text', (node: Text, index: number | null, parent: Parent | null) => {
            if (!parent || index === null) return;

            const refRegex = /<ref>(\d+)<\/ref>/g;
            if (!refRegex.test(node.value)) return;

            const newNodes = [];
            let lastIndex = 0;
            let match;

            // 使用正则表达式的 exec 方法来遍历所有匹配项
            while ((match = refRegex.exec(node.value)) !== null) {
                // 添加匹配前的文本部分
                if (match.index > lastIndex) {
                    newNodes.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
                }

                // 添加我们的自定义引用节点
                newNodes.push({
                    type: 'text',
                    value: `[${match[1]}]`, // 在AST中，它看起来像普通文本"[1]"
                    data: {
                        // 但我们给它附加了自定义数据
                        isCustomRef: true,
                        refIndex: parseInt(match[1], 10)
                    }
                });

                lastIndex = match.index + match[0].length;
            }

            // 添加最后一个匹配项之后的文本部分
            if (lastIndex < node.value.length) {
                newNodes.push({ type: 'text', value: node.value.slice(lastIndex) });
            }

            // 用新生成的节点数组替换掉原来的单一文本节点
            if (newNodes.length > 0) {
                parent.children.splice(index, 1, ...newNodes);
                return [visit.SKIP, index + newNodes.length]; // 跳过新插入的节点，防止无限循环
            }
        });
    };
};