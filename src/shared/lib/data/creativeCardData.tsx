// [!file src/shared/lib/data/creativeCardData.ts]
import { CreativeCardData } from '@/features/student/home/components/common/CreativeCard/CreativeCard';
import { Atom, Beaker, BrainCircuit, Code, Sigma, Scale, Landmark, Dna, FlaskConical, FunctionSquare } from "lucide-react";
import React from "react";

export const creativeCardMockData: CreativeCardData[] = [
    // --- 计算机科学 ---
    {
        id: 'concept-cs-1',
        type: 'concept',
        title: '递归',
        subtitle: '算法思想',
        content: '一个函数直接或间接调用自身的过程，通常用于解决可以分解为相同类型子问题的问题。',
        theme: 'sky',
        icon: <FunctionSquare size={150} />,
    },
    {
        id: 'code-cs-1',
        type: 'code',
        title: '二分查找',
        subtitle: 'Java',
        content:
            `public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
        theme: 'indigo',
        icon: <Code size={18} />,
    },
    {
        id: 'concept-cs-2',
        type: 'concept',
        title: '多态',
        subtitle: '面向对象编程',
        content: '允许不同类的对象对同一消息做出响应。即同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。',
        theme: 'iris',
        icon: <Dna size={150} />,
    },

    // --- 物理学 ---
    {
        id: 'formula-phy-1',
        type: 'formula',
        title: '麦克斯韦方程组',
        subtitle: '电磁学',
        content: '∇·E = ρ/ε₀; ∇·B = 0; ∇×E = -∂B/∂t; ∇×B = μ₀(J + ε₀∂E/∂t)',
        theme: 'ember',
        icon: <Sigma size={18} />,
    },
    {
        id: 'concept-phy-1',
        type: 'concept',
        title: '不确定性原理',
        subtitle: '量子力学',
        content: '一个微观粒子的某些物理量（如位置和动量）不可能同时被精确测量，其不确定性的乘积存在一个下限。',
        theme: 'rose',
        icon: <Atom size={150} />,
    },
    {
        id: 'formula-phy-2',
        type: 'formula',
        title: '万有引力定律',
        subtitle: '经典力学',
        content: 'F = G * (m₁m₂ / r²)',
        theme: 'graphite',
        icon: <Sigma size={18} />,
    },

    // --- 数学 ---
    {
        id: 'formula-math-1',
        type: 'formula',
        title: '勾股定理',
        subtitle: '几何学',
        content: 'a² + b² = c²',
        theme: 'lemon',
        icon: <Sigma size={18} />,
    },
    {
        id: 'concept-math-1',
        type: 'concept',
        title: '极限',
        subtitle: '微积分',
        content: '当一个变量无限趋近于一个特定值时，函数值的变化趋势。它是微积分的基石。',
        theme: 'mint',
        icon: <BrainCircuit size={150} />,
    },
    {
        id: 'formula-math-2',
        type: 'formula',
        title: '欧拉恒等式',
        subtitle: '分析学',
        content: 'e^(iπ) + 1 = 0',
        theme: 'lilac',
        icon: <Sigma size={18} />,
    },

    // --- 化学 ---
    {
        id: 'concept-chem-1',
        type: 'concept',
        title: '化学键',
        subtitle: '基础化学',
        content: '分子或晶体中，将原子或离子结合在一起的相互作用力，主要包括离子键、共价键和金属键。',
        theme: 'meadow',
        icon: <FlaskConical size={150} />,
    },
    {
        id: 'formula-chem-1',
        type: 'formula',
        title: '理想气体状态方程',
        subtitle: '物理化学',
        content: 'PV = nRT',
        theme: 'olive',
        icon: <Sigma size={18} />,
    },
    {
        id: 'code-chem-1',
        type: 'code',
        title: '计算摩尔质量',
        subtitle: 'Python/ChemPy',
        content:
            `from chempy import Substance
water = Substance.from_formula('H2O')
print(f"水的摩尔质量: {water.molar_mass()} g/mol")
# 输出: 水的摩尔质量: 18.01528 g/mol`,
        theme: 'sea',
        icon: <Code size={18} />,
    },

    // --- 经济学 ---
    {
        id: 'concept-econ-1',
        type: 'concept',
        title: '机会成本',
        subtitle: '微观经济学',
        content: '为了得到某种东西而所要放弃另一些东西的最大价值。它强调了选择的代价。',
        theme: 'coral',
        icon: <Scale size={150} />,
    },
    {
        id: 'formula-econ-1',
        type: 'formula',
        title: 'GDP计算 (支出法)',
        subtitle: '宏观经济学',
        content: 'Y = C + I + G + (X - M)',
        theme: 'ember',
        icon: <Sigma size={18} />,
    },
    {
        id: 'concept-econ-2',
        type: 'concept',
        title: '看不见的手',
        subtitle: '经济学原理',
        content: '亚当·斯密提出的理论，指在市场经济中，个人追求自身利益的行为会在无意中促进社会整体的利益。',
        theme: 'sakura',
        icon: <BrainCircuit size={150} />,
    },

    // --- 历史学 ---
    {
        id: 'concept-hist-1',
        type: 'concept',
        title: '文艺复兴',
        subtitle: '世界历史',
        content: '14至16世纪欧洲的一场思想文化运动，旨在复兴古希腊罗马的艺术与科学，标志着中世纪的结束和现代的开端。',
        theme: 'rose',
        icon: <Landmark size={150} />,
    },
    {
        id: 'formula-hist-1', // 这里的 formula 是一个比喻
        type: 'formula',
        title: '修昔底德陷阱',
        subtitle: '国际关系',
        content: '新兴大国必然挑战守成大国，战争不可避免。',
        theme: 'graphite',
        icon: <Sigma size={18} />,
    },

    // --- 更多混合学科 ---
    {
        id: 'code-bio-1',
        type: 'code',
        title: 'DNA反向互补序列',
        subtitle: 'Python/Biopython',
        content:
            `from Bio.Seq import Seq
my_seq = Seq("GATCGAT")
rev_comp_seq = my_seq.reverse_complement()
print(rev_comp_seq)
# 输出: ATCGATC`,
        theme: 'mint',
        icon: <Code size={18} />,
    },
    {
        id: 'concept-philo-1',
        type: 'concept',
        title: '我思故我在',
        subtitle: '哲学',
        content: '笛卡尔提出的基本哲学命题，意指我无法怀疑“我正在怀疑”这一事实，因此我的存在是确定无疑的。',
        theme: 'lilac',
        icon: <BrainCircuit size={150} />,
    },
    {
        id: 'formula-stats-1',
        type: 'formula',
        title: '贝叶斯定理',
        subtitle: '概率论',
        content: 'P(A|B) = [P(B|A) * P(A)] / P(B)',
        theme: 'sky',
        icon: <Sigma size={18} />,
    },
    {
        id: 'concept-art-1',
        type: 'concept',
        title: '黄金分割',
        subtitle: '艺术与设计',
        content: '一个数学比例，约为1:1.618，被广泛认为能创造出最和谐、最富美感的视觉构图。',
        theme: 'ember',
        icon: <FunctionSquare size={150} />,
    },
    {
        id: 'code-ml-1',
        type: 'code',
        title: '线性回归模型',
        subtitle: 'Python/Scikit-learn',
        content:
            `from sklearn.linear_model import LinearRegression
import numpy as np
X = np.array([[1], [2], [3], [4]])
y = np.dot(X, np.array([2])) + 3
model = LinearRegression().fit(X, y)
print(f"斜率: {model.coef_}, 截距: {model.intercept_}")`,
        theme: 'indigo',
        icon: <Code size={18} />,
    },
    {
        id: 'formula-fin-1',
        type: 'formula',
        title: '复利公式',
        subtitle: '金融学',
        content: 'A = P(1 + r/n)^(nt)',
        theme: 'olive',
        icon: <Sigma size={18} />,
    },
    {
        id: 'concept-psy-1',
        type: 'concept',
        title: '巴甫洛夫的狗',
        subtitle: '心理学',
        content: '经典条件反射的著名实验，展示了如何通过将中性刺激（铃声）与非条件刺激（食物）配对，使中性刺激也能引发原先只有非条件刺激才能引发的反应（流口水）。',
        theme: 'coral',
        icon: <Beaker size={150} />,
    },
    {
        id: 'code-web-1',
        type: 'code',
        title: 'Fetch API 请求',
        subtitle: 'JavaScript',
        content:
            `fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));`,
        theme: 'sea',
        icon: <Code size={18} />,
    },
    {
        id: 'formula-logic-1',
        type: 'formula',
        title: '德摩根定律',
        subtitle: '数理逻辑',
        content: '¬(P ∧ Q) ⇔ (¬P ∨ ¬Q); ¬(P ∨ Q) ⇔ (¬P ∧ ¬Q)',
        theme: 'iris',
        icon: <Sigma size={18} />,
    },
    {
        id: 'concept-soc-1',
        type: 'concept',
        title: '内卷化',
        subtitle: '社会学',
        content: '一种社会或文化模式在某一发展阶段达到一种确定的形式后，便停滞不前或无法转化为另一种高级模式的现象，只能在内部进行无意义的复杂化。',
        theme: 'graphite',
        icon: <BrainCircuit size={150} />,
    },
    {
        id: 'code-game-1',
        type: 'code',
        title: '简单的玩家移动',
        subtitle: 'C#/Unity',
        content:
            `public class PlayerMovement : MonoBehaviour {
    public float speed = 5.0f;
    void Update() {
        float moveHorizontal = Input.GetAxis("Horizontal");
        float moveVertical = Input.GetAxis("Vertical");
        Vector3 movement = new Vector3(moveHorizontal, 0.0f, moveVertical);
        transform.Translate(movement * speed * Time.deltaTime, Space.World);
    }
}`,
        theme: 'sakura',
        icon: <Code size={18} />,
    },
    {
        id: 'formula-info-1',
        type: 'formula',
        title: '信息熵公式',
        subtitle: '信息论',
        content: 'H(X) = -Σ [P(xᵢ) * log₂(P(xᵢ))]',
        theme: 'lemon',
        icon: <Sigma size={18} />,
    },
];