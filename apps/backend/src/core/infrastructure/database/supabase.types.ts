/* eslint-disable @stylistic/ts/indent */
/* eslint-disable no-secrets/no-secrets */
/* eslint-disable import/exports-last */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            execution_processing_batches: {
                Row: {
                    batch_id: string;
                    created_at: string | null;
                    expected_chunks: number;
                    installation_id: string;
                    received_chunks: number;
                    status: string;
                    updated_at: string | null;
                    user_id: string;
                };
                Insert: {
                    batch_id: string;
                    created_at?: string | null;
                    expected_chunks: number;
                    installation_id: string;
                    received_chunks?: number;
                    status?: string;
                    updated_at?: string | null;
                    user_id: string;
                };
                Update: {
                    batch_id?: string;
                    created_at?: string | null;
                    expected_chunks?: number;
                    installation_id?: string;
                    received_chunks?: number;
                    status?: string;
                    updated_at?: string | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'execution_processing_batches_installation_id_fkey';
                        columns: ['installation_id'];
                        isOneToOne: false;
                        referencedRelation: 'users_installations';
                        referencedColumns: ['installation_id'];
                    },
                    {
                        foreignKeyName: 'execution_processing_batches_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
            global_settings: {
                Row: {
                    configuration: string;
                    id: string;
                    updated_at: string;
                    value: string;
                };
                Insert: {
                    configuration: string;
                    id?: string;
                    updated_at?: string;
                    value: string;
                };
                Update: {
                    configuration?: string;
                    id?: string;
                    updated_at?: string;
                    value?: string;
                };
                Relationships: [];
            };
            installation_attempts: {
                Row: {
                    created_at: string;
                    id: string;
                    status: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    status?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    status?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'installation_attempts_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
            repositories: {
                Row: {
                    account_id: string;
                    account_name: string;
                    deleted_at: string | null;
                    id: string;
                    installation_id: string;
                    name: string;
                    url: string;
                };
                Insert: {
                    account_id: string;
                    account_name: string;
                    deleted_at?: string | null;
                    id: string;
                    installation_id: string;
                    name: string;
                    url: string;
                };
                Update: {
                    account_id?: string;
                    account_name?: string;
                    deleted_at?: string | null;
                    id?: string;
                    installation_id?: string;
                    name?: string;
                    url?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'repositories_installation_id_fkey';
                        columns: ['installation_id'];
                        isOneToOne: false;
                        referencedRelation: 'users_installations';
                        referencedColumns: ['installation_id'];
                    },
                ];
            };
            tags: {
                Row: {
                    created_at: string;
                    id: string;
                    name: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    name: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    name?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'tags_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
            users: {
                Row: {
                    auth0_id: string;
                    created_at: string;
                    first_login: boolean | null;
                    id: string;
                    plan: string;
                    role: string;
                    team_id: string | null;
                    updated_at: string;
                };
                Insert: {
                    auth0_id: string;
                    created_at?: string;
                    first_login?: boolean | null;
                    id?: string;
                    plan?: string;
                    role: string;
                    team_id?: string | null;
                    updated_at?: string;
                };
                Update: {
                    auth0_id?: string;
                    created_at?: string;
                    first_login?: boolean | null;
                    id?: string;
                    plan?: string;
                    role?: string;
                    team_id?: string | null;
                    updated_at?: string;
                };
                Relationships: [];
            };
            users_installations: {
                Row: {
                    installation_id: string;
                    installed_at: string;
                    status: string;
                    user_id: string;
                };
                Insert: {
                    installation_id: string;
                    installed_at?: string;
                    status?: string;
                    user_id: string;
                };
                Update: {
                    installation_id?: string;
                    installed_at?: string;
                    status?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'users_installations_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
            users_loading_operations: {
                Row: {
                    executions: string;
                    jobs: string;
                    repositories: string;
                    steps: string;
                    user_id: string;
                    workflows: string;
                };
                Insert: {
                    executions?: string;
                    jobs?: string;
                    repositories?: string;
                    steps?: string;
                    user_id: string;
                    workflows?: string;
                };
                Update: {
                    executions?: string;
                    jobs?: string;
                    repositories?: string;
                    steps?: string;
                    user_id?: string;
                    workflows?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'users_loading_operations_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: true;
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
            users_working_repositories: {
                Row: {
                    account_id: string;
                    installation_id: string;
                    repository_id: string;
                    user_id: string;
                };
                Insert: {
                    account_id: string;
                    installation_id: string;
                    repository_id: string;
                    user_id: string;
                };
                Update: {
                    account_id?: string;
                    installation_id?: string;
                    repository_id?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'users_working_repositories_installation_id_fkey';
                        columns: ['installation_id'];
                        isOneToOne: false;
                        referencedRelation: 'users_installations';
                        referencedColumns: ['installation_id'];
                    },
                    {
                        foreignKeyName: 'users_working_repositories_repository_id_fkey';
                        columns: ['repository_id'];
                        isOneToOne: false;
                        referencedRelation: 'repositories';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'users_working_repositories_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
            workflow_tags: {
                Row: {
                    tag_id: string;
                    workflow_id: string;
                };
                Insert: {
                    tag_id: string;
                    workflow_id: string;
                };
                Update: {
                    tag_id?: string;
                    workflow_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'workflow_tags_tag_id_fkey';
                        columns: ['tag_id'];
                        isOneToOne: false;
                        referencedRelation: 'tags';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'workflow_tags_workflow_id_fkey';
                        columns: ['workflow_id'];
                        isOneToOne: false;
                        referencedRelation: 'workflows';
                        referencedColumns: ['id'];
                    },
                ];
            };
            workflows: {
                Row: {
                    account_name: string;
                    created_at: string;
                    description: string | null;
                    html_url: string;
                    id: string;
                    installation_id: string;
                    name: string;
                    path: string;
                    repository_id: string;
                    repository_name: string;
                    state: string;
                    updated_at: string | null;
                };
                Insert: {
                    account_name: string;
                    created_at: string;
                    description?: string | null;
                    html_url: string;
                    id: string;
                    installation_id: string;
                    name: string;
                    path: string;
                    repository_id: string;
                    repository_name: string;
                    state: string;
                    updated_at?: string | null;
                };
                Update: {
                    account_name?: string;
                    created_at?: string;
                    description?: string | null;
                    html_url?: string;
                    id?: string;
                    installation_id?: string;
                    name?: string;
                    path?: string;
                    repository_id?: string;
                    repository_name?: string;
                    state?: string;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'workflows_installation_id_fkey';
                        columns: ['installation_id'];
                        isOneToOne: false;
                        referencedRelation: 'users_installations';
                        referencedColumns: ['installation_id'];
                    },
                    {
                        foreignKeyName: 'workflows_repository_id_fkey';
                        columns: ['repository_id'];
                        isOneToOne: false;
                        referencedRelation: 'repositories';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: Record<never, never>;
        Functions: Record<never, never>;
        Enums: Record<never, never>;
        CompositeTypes: Record<never, never>;
    };
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
    DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views']) | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] & Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] & Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
      ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
      ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes'] | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
      ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never;

export const Constants = {
    public: {
        Enums: {},
    },
} as const;
