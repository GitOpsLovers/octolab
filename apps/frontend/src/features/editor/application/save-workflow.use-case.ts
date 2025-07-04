import { CreateWorkflowDto } from '../domain/dtos/create-workflow.dto';
import { WorkflowsRepository } from '../domain/repositories/workflows.repository';

/**
 * Create workflow use case.
 *
 * @param workflowsRepository Workflows repository.
 * @param createDto Create workflow DTO.
 *
 * @returns The created workflow.
 */
export function createWorkflowUseCase(workflowsRepository: WorkflowsRepository, createDto: CreateWorkflowDto): Promise<any> {
    return workflowsRepository.create(createDto);
}
