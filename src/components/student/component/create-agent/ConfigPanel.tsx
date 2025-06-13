"use client";
import React, { useState } from 'react';
import styles from './ConfigPanel.module.css';
import ConfigSection from './ConfigSection';
import PromptEditor from './PromptEditor';
import Modal from '@/components/common/Modal/Modal'; // 引入通用 Modal
import { availableModels, AvailableModel } from '@/lib/data/availableModels'; // 引入模型数据
import { knowledgeData, KnowledgeBase } from '@/lib/data/knowledgeData'; // 引入知识库数据

// 开关组件保持不变
const ToggleSwitch = ({ label, info = false, defaultChecked = false }: { label: string, info?: boolean, defaultChecked?: boolean }) => (
    <div className={styles.toggleItem}>
        <div className={styles.toggleLabel}>
            {label} {info && <i className="far fa-question-circle"></i>}
        </div>
        <label className={styles.switch}>
            <input type="checkbox" defaultChecked={defaultChecked} />
            <span className={styles.slider}></span>
        </label>
    </div>
);

// 主面板组件
const ConfigPanel: React.FC = () => {
    // --- State 管理 ---
    const [modalType, setModalType] = useState<'model' | 'knowledge' | null>(null);
    const [selectedModel, setSelectedModel] = useState<AvailableModel>(availableModels[0]);
    const [selectedKbs, setSelectedKbs] = useState<KnowledgeBase[]>([knowledgeData[1]]);

    // --- Modal 内部的临时状态 ---
    const [tempSelectedKbs, setTempSelectedKbs] = useState<KnowledgeBase[]>(selectedKbs);

    // --- 事件处理 ---
    const handleSelectModel = (model: AvailableModel) => {
        setSelectedModel(model);
        setModalType(null); // 关闭弹窗
    };

    const handleToggleKbSelection = (kb: KnowledgeBase) => {
        setTempSelectedKbs(prev => {
            const isSelected = prev.some(item => item.id === kb.id);
            if (isSelected) {
                return prev.filter(item => item.id !== kb.id);
            } else {
                if (prev.length < 10) {
                    return [...prev, kb];
                }
                return prev; // 达到上限，不添加
            }
        });
    };

    const handleConfirmKbSelection = () => {
        setSelectedKbs(tempSelectedKbs);
        setModalType(null);
    };

    const handleOpenModal = (type: 'model' | 'knowledge') => {
        if (type === 'knowledge') {
            // 打开知识库弹窗时，用当前已选的知识库初始化临时状态
            setTempSelectedKbs(selectedKbs);
        }
        setModalType(type);
    };

    const handleCloseModal = () => {
        setModalType(null);
    };

    const handleRemoveKb = (kbId: string) => {
        setSelectedKbs(prev => prev.filter(kb => kb.id !== kbId));
    };

    return (
        <aside className={styles.panel}>
            {/* ... PanelHeader 和 ModelSelector 部分 ... */}
            <div className={styles.panelHeader}>
                <h3>API配置</h3>
            </div>
            <div className={styles.modelSelector}>
                <i className="fas fa-microchip"></i>
                <span>{selectedModel.name}</span>
                <span className={styles.modelTag}>128K</span>
                <button className={styles.configButton} onClick={() => handleOpenModal('model')}>
                    <i className="fas fa-cog"></i> 设置
                </button>
            </div>

            <div className={styles.panelContent}>
                <ConfigSection icon="fas fa-terminal" title="指令">
                    <PromptEditor />
                </ConfigSection>

                <ConfigSection icon="fas fa-code" title="变量">
                    <div className={styles.variableSection}>
                        <p>提示词中变量的选项来自下方“变量配置”，如需新增请在下方操作</p>
                        <div className={styles.variableControls}>
                            <span>变量</span>
                            <button><i className="fas fa-plus"></i> 自定义变量</button>
                        </div>
                        <ToggleSwitch label="视觉" info />
                    </div>
                </ConfigSection>

                <ConfigSection icon="fas fa-book" title="知识">
                    <div className={styles.knowledgeSection}>
                        <div className={styles.knowledgeHeader}>
                            <div className={styles.toggleLabel}>知识库</div>
                            <span className={styles.knowledgeCount}>{selectedKbs.length}/10</span>
                            <label className={styles.switch}>
                                <input type="checkbox" defaultChecked />
                                <span className={styles.slider}></span>
                            </label>
                            <div className={styles.knowledgeActions}>
                                <button><i className="fas fa-cog"></i> 权重</button>
                                <button onClick={() => handleOpenModal('knowledge')}><i className="fas fa-plus"></i> 知识库</button>
                                <button><i className="fas fa-cog"></i> 配置</button>
                            </div>
                        </div>
                        <div className={styles.knowledgeList}>
                            {selectedKbs.map(kb => (
                                <div key={kb.id} className={styles.knowledgeItem}>
                                    <i className={`fas ${kb.icon}`}></i>
                                    <span>{kb.name}</span>
                                    <div className={styles.knowledgeItemActions}>
                                        <span>权重 1</span>
                                        <button onClick={() => handleRemoveKb(kb.id)}><i className="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ToggleSwitch label="动态文件解析" info />
                        <ToggleSwitch label="联网搜索" info />
                        <ToggleSwitch label="样例库" />
                    </div>
                </ConfigSection>
            </div>

            {/* --- Modal 渲染 --- */}
            <Modal
                isOpen={modalType !== null}
                onClose={handleCloseModal}
                title={modalType === 'model' ? '模型选择' : '添加知识库'}
                footer={modalType === 'knowledge' ? (
                    <>
                        <button onClick={handleCloseModal} className={`${styles.footerButton} ${styles.cancelButton}`}>取消</button>
                        <button onClick={handleConfirmKbSelection} className={`${styles.footerButton} ${styles.confirmButton}`}>确定</button>
                    </>
                ) : null}
            >
                {/* --- 模型选择内容 --- */}
                {modalType === 'model' && (
                    <div className={styles.selectionList}>
                        {availableModels.map(model => (
                            <div
                                key={model.id}
                                className={`${styles.selectionItem} ${selectedModel.id === model.id ? styles.selected : ''}`}
                                onClick={() => handleSelectModel(model)}
                            >
                                <i className={`far ${selectedModel.id === model.id ? 'fa-check-circle' : 'fa-circle'}`}></i>
                                <div className={styles.selectionInfo}>
                                    <div className={styles.selectionTitle}>
                                        {model.name}
                                        {model.tag && <span className={`${styles.selectionTag} ${styles[model.tag.toLowerCase()]}`}>{model.tag}</span>}
                                    </div>
                                    <p className={styles.selectionDesc}>{model.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* --- 知识库选择内容 --- */}
                {modalType === 'knowledge' && (
                    <div className={styles.selectionList}>
                        {knowledgeData.map(kb => {
                            const isSelected = tempSelectedKbs.some(item => item.id === kb.id);
                            const isDisabled = !isSelected && tempSelectedKbs.length >= 10;
                            return (
                                <div
                                    key={kb.id}
                                    className={`${styles.selectionItem} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
                                    onClick={() => !isDisabled && handleToggleKbSelection(kb)}
                                >
                                    <i className={`far ${isSelected ? 'fa-check-square' : 'fa-square'}`}></i>
                                    <div className={styles.selectionInfo}>
                                        <div className={styles.selectionTitle}>{kb.name}</div>
                                        <p className={styles.selectionDesc}>共 {kb.chunkCount} 切片 · 创建于 {kb.createdAt}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Modal>
        </aside>
    );
};

export default ConfigPanel;