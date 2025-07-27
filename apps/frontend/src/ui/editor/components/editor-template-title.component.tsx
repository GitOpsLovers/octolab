'use client';

import { useState } from 'react';
import { FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';

import { useEditorTemplate } from '../hooks/editor-template.hooks';

/**
 * Editor template title component.
 */
export function EditorTemplateTitle() {
    const { editingWorkflow, setWorkflowNameAndDescription } = useEditorTemplate();

    const [editingField, setEditingField] = useState<'name' | 'description' | null>(null);
    const [tempValue, setTempValue] = useState('');

    if (!editingWorkflow) return null;

    // Start editing the specified field
    const startEditing = (field: 'name' | 'description') => {
        setEditingField(field);

        if (field === 'name') {
            setTempValue(editingWorkflow.name ?? '');
        } else {
            setTempValue(editingWorkflow.description ?? '');
        }
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingField(null);
        setTempValue('');
    };

    // Save editing
    const saveEditing = () => {
        if (!tempValue.trim()) return;

        if (editingField === 'name') {
            setWorkflowNameAndDescription(tempValue, editingWorkflow.description ?? '');
        } else if (editingField === 'description') {
            setWorkflowNameAndDescription(editingWorkflow.name ?? '', tempValue);
        }

        setEditingField(null);
    };

    return (
        <div className="mb-4">
            {/* Title */}
            <div className="flex items-center gap-2">
                {editingField === 'name' ? (
                    <>
                        <input
                            value={tempValue}
                            onChange={(e) => {
                                setTempValue(e.target.value);
                            }}
                            className="w-1/2 bg-transparent border-b border-primary text-2xl font-bold leading-none font-montserrat focus:outline-none transition"
                        />
                        <button onClick={saveEditing} className="text-text/70 hover:text-success/80 transition cursor-pointer">
                            <FaCheck />
                        </button>
                        <button onClick={cancelEditing} className="text-text/70 hover:text-red-400 transition cursor-pointer">
                            <FaTimes />
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold">{editingWorkflow.name}</h1>
                        <button
                            onClick={() => {
                                startEditing('name');
                            }}
                            className="text-text/70 hover:text-primary transition cursor-pointer"
                        >
                            <FaPencilAlt />
                        </button>
                    </>
                )}
            </div>

            {/* Description */}
            <div className="flex items-center gap-2 mt-1">
                {editingField === 'description' ? (
                    <>
                        <input
                            value={tempValue}
                            onChange={(e) => {
                                setTempValue(e.target.value);
                            }}
                            className="w-1/2 bg-transparent border-b border-primary text-text/70 text-base focus:outline-none transition"
                        />
                        <button onClick={saveEditing} className="text-text/70 hover:text-success/80 transition cursor-pointer">
                            <FaCheck />
                        </button>
                        <button onClick={cancelEditing} className="text-text/70 hover:text-red-400 transition cursor-pointer">
                            <FaTimes />
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-text/70 text-base">{editingWorkflow.description}</p>
                        <button
                            onClick={() => {
                                startEditing('description');
                            }}
                            className="text-text/70 hover:text-primary transition cursor-pointer"
                        >
                            <FaPencilAlt />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
