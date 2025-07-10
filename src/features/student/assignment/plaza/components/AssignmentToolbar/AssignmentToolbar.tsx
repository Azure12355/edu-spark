// [!file src/features/student/assignment/plaza/components/AssignmentToolbar/AssignmentToolbar.tsx]
import React from 'react';
import { Search } from 'lucide-react';
import styles from './AssignmentToolbar.module.css';
import { FilterType } from '../../hooks/useAssignmentPlaza';

interface AssignmentToolbarProps {
    filter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const AssignmentToolbar: React.FC<AssignmentToolbarProps> = ({
                                                                 filter,
                                                                 onFilterChange,
                                                                 searchQuery,
                                                                 onSearchChange,
                                                             }) => {
    const filters: { key: FilterType, label: string }[] = [
        { key: 'all', label: '全部' },
        { key: 'ongoing', label: '进行中' },
        { key: 'not_started', label: '未开始' },
        { key: 'ended', label: '已结束' },
    ];

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.filterGroup}>
                {filters.map((f) => (
                    <button
                        key={f.key}
                        className={`${styles.filterButton} ${filter === f.key ? styles.active : ''}`}
                        onClick={() => onFilterChange(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
            <div className={styles.searchGroup}>
                <Search size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="搜索练习名称..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default AssignmentToolbar;