import { CreateWorkflowDto } from '../domain/dtos/create-workflow.dto';
import { EditorRepository } from '../domain/repositories/editor.repository';

/**
 * Create workflow use case.
 *
 * @param workflowsRepository Editor repository.
 * @param createDto Create workflow DTO.
 *
 * @returns The created workflow.
 */
export function createWorkflowUseCase(workflowsRepository: EditorRepository, createDto: CreateWorkflowDto): Promise<any> {
    console.log('createWorkflowUseCase', createDto);
    return workflowsRepository.create(createDto);
}
