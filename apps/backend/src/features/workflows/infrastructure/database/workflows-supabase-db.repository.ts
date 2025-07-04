import { CreateWorkflowDto } from '../../domain/dtos/create-workflow.dto';
import { DatabaseWorkflow } from '../../domain/models/workflows.models';
import { WorkflowsDatabaseRepository } from '../../domain/repositories/workflows.repository';

import { DatabaseError, DatabaseErrorType } from '@core/infrastructure/database/database.error';
import { getSupabaseClient } from '@core/infrastructure/database/supabase.client';

/**
 * Workflows Supabase database repository.
 */
export const workflowsSupabaseDatabaseRepository: WorkflowsDatabaseRepository = {
    createWorkflow: async (createDto: CreateWorkflowDto): Promise<DatabaseWorkflow> => {
        const supabase = getSupabaseClient();
        try {
            const { data, error } = await supabase
                .from('workflows')
                .insert([
                    {
                        id: createDto.id,
                    },
                ])
                .select()
                .single();

            if (error || !data) throw new DatabaseError('Failed to save workflow on database', DatabaseErrorType.DATABASE_CONNECTION_ERROR);

            return {
                id: data.id,
            } as DatabaseWorkflow;
        } catch (error: unknown) {
            throw new DatabaseError(`Failed to save workflow on database: ${(error as Error).message}`, DatabaseErrorType.DATABASE_CONNECTION_ERROR);
        }
    },
};
