import { CreateWorkflowDto } from '../../domain/dtos/create-workflow.dto';
import { DatabaseWorkflow } from '../../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../../domain/repositories/workflows.repository';

import { DatabaseError, DatabaseErrorType } from '@core/infrastructure/database/database.error';
import { getSupabaseClient } from '@core/infrastructure/database/supabase.client';
import { UpdateWorkflowDto } from '@features/workflows/domain/dtos/update-workflow.dto';

/**
 * Workflows Supabase database repository.
 */
export const workflowsSupabaseDatabaseRepository: WorkflowsDatabaseRepository = {
    getWorkflowById: async (id: string): Promise<DatabaseWorkflow | null> => {
        const supabase = getSupabaseClient();
        try {
            const { data, error } = await supabase.from('workflows').select().eq('id', id).maybeSingle(); // 👈 importante: usar maybeSingle

            if (error && error.code !== 'PGRST116') {
                // PGRST116: row not found (en Supabase)
                throw new DatabaseError('Failed to retrieve workflow from database', DatabaseErrorType.DATABASE_CONNECTION_ERROR);
            }

            if (!data) {
                return null;
            }

            const workflow = {
                id: data.id,
                name: data.name,
                description: data.description,
                yaml: data.content,
                data: data.config,
            };

            return workflow as DatabaseWorkflow;
        } catch (error: unknown) {
            throw new DatabaseError(`Failed to retrieve workflow from database: ${(error as Error).message}`, DatabaseErrorType.DATABASE_CONNECTION_ERROR);
        }
    },
    createWorkflow: async (createDto: CreateWorkflowDto): Promise<DatabaseWorkflow> => {
        const supabase = getSupabaseClient();
        try {
            const { data, error } = await supabase
                .from('workflows')
                .insert([
                    {
                        id: createDto.id,
                        name: createDto.name,
                        description: createDto.description,
                        yaml: JSON.stringify(createDto.yaml),
                        data: JSON.stringify(createDto.data),
                    },
                ])
                .select()
                .single();

            if (error || !data) throw new DatabaseError('Failed to save workflow on database', DatabaseErrorType.DATABASE_CONNECTION_ERROR);

            const workflow = {
                id: data.id,
                name: data.name,
                description: data.description,
                yaml: data.content,
                data: data.config,
            };

            return workflow as DatabaseWorkflow;
        } catch (error: unknown) {
            throw new DatabaseError(`Failed to save workflow on database: ${(error as Error).message}`, DatabaseErrorType.DATABASE_CONNECTION_ERROR);
        }
    },
    updateWorkflow: async (updateDto: UpdateWorkflowDto): Promise<DatabaseWorkflow> => {
        const supabase = getSupabaseClient();
        try {
            const { data, error } = await supabase
                .from('workflows')
                .update({
                    id: updateDto.id,
                    name: updateDto.name,
                    description: updateDto.description,
                    yaml: JSON.stringify(updateDto.yaml),
                    data: JSON.stringify(updateDto.data),
                })
                .eq('id', updateDto.id)
                .select()
                .single();

            if (error || !data) throw new DatabaseError('Failed to update workflow on database', DatabaseErrorType.DATABASE_CONNECTION_ERROR);

            const workflow = {
                id: data.id,
                name: data.name,
                description: data.description,
                yaml: data.content,
                data: data.config,
            };

            return workflow as DatabaseWorkflow;
        } catch (error: unknown) {
            throw new DatabaseError(`Failed to update workflow on database: ${(error as Error).message}`, DatabaseErrorType.DATABASE_CONNECTION_ERROR);
        }
    },
};
