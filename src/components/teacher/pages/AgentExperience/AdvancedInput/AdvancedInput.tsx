// src/components/teacher/pages/AgentExperience/AdvancedInput/AdvancedInput.tsx
"use client";

import React, { useState } from 'react';
import { Button, Input, Popover, Tooltip, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import {
  UploadOutlined,
  SendOutlined,
  FileOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FileMarkdownOutlined,
  FileTextOutlined,
  CloseCircleFilled,
} from '@ant-design/icons';
import styles from './AdvancedInput.module.css';

const { TextArea } = Input;

interface AdvancedInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  isSending: boolean;
  onSubmit: () => void;
}

// 文件图标映射
const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return <FileImageOutlined style={{ color: '#d46b08' }} />;
  if (extension === 'pdf') return <FilePdfOutlined style={{ color: '#f5222d' }} />;
  if (['doc', 'docx'].includes(extension)) return <FileWordOutlined style={{ color: '#1890ff' }} />;
  if (['xls', 'xlsx'].includes(extension)) return <FileExcelOutlined style={{ color: '#52c41a' }} />;
  if (['ppt', 'pptx'].includes(extension)) return <FilePptOutlined style={{ color: '#eb2f96' }} />;
  if (['md', 'markdown'].includes(extension)) return <FileMarkdownOutlined style={{ color: '#2f54eb' }} />;
  if (['txt', 'mobi', 'epub'].includes(extension)) return <FileTextOutlined style={{ color: '#722ed1' }} />;
  return <FileOutlined />;
};

// 格式化文件大小
const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const AdvancedInput: React.FC<AdvancedInputProps> = ({ inputValue, setInputValue, isSending, onSubmit }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleRemoveFile = (uid: string) => {
    setFileList(currentFiles => currentFiles.filter(file => file.uid !== uid));
  };

  const uploadProps: UploadProps = {
    multiple: true,
    fileList: fileList,
    showUploadList: false, // 我们自己渲染列表
    onChange(info) {
      // 限制文件总数，例如最多5个
      const combinedList = [...fileList, ...info.fileList.slice(-1)].slice(-5);
      const uniqueList = Array.from(new Map(combinedList.map(file => [file.uid, file])).values());
      setFileList(uniqueList);
    },
    beforeUpload: () => false, // 阻止自动上传
  };

  const UploadMenu = (
    <div className={styles.uploadMenu}>
        <Upload {...uploadProps}>
            <Tooltip
                title="可同时上传100个文件(每个150 MB) 支持PDF / Word / Excel / Markdown / EPUB / Mobi / txt"
                placement="right"
                mouseEnterDelay={0.5}
            >
                <div className={styles.uploadMenuItem}>
                    <FileTextOutlined /> 上传文档
                </div>
            </Tooltip>
        </Upload>
      <Upload {...uploadProps} accept="image/*">
        <div className={styles.uploadMenuItem}>
          <FileImageOutlined /> 上传图片
        </div>
      </Upload>
    </div>
  );

  return (
    <div className={`${styles.inputContainer} ${fileList.length > 0 ? styles.hasFiles : ''}`}>
      {fileList.length > 0 && (
        <div className={styles.filePreviewArea}>
          {fileList.map(file => (
            <div key={file.uid} className={styles.fileCard}>
              <div className={styles.fileIcon}>{getFileIcon(file.name)}</div>
              <div className={styles.fileInfo}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{formatFileSize(file.size || 0)}</span>
              </div>
              <Button
                type="text"
                shape="circle"
                icon={<CloseCircleFilled />}
                className={styles.removeFileButton}
                onClick={() => handleRemoveFile(file.uid)}
              />
            </div>
          ))}
        </div>
      )}

      <div className={styles.mainInputRow}>
        <Popover content={UploadMenu} trigger="hover" placement="topLeft">
          <Button
            className={styles.actionButton}
            shape="circle"
            icon={<UploadOutlined />}
          />
        </Popover>
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="遇事不决问通义"
          autoSize={{ minRows: 1, maxRows: 6 }}
          bordered={false}
          className={styles.textArea}
          disabled={isSending}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          className={styles.sendButton}
          onClick={onSubmit}
          disabled={isSending || (!inputValue.trim() && fileList.length === 0)}
        />
      </div>
    </div>
  );
};

export default AdvancedInput;