import { useApiQuery } from "@/shared/hooks/use-api-query";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { z } from "zod";

export const ConversationSchema = z.object({
    id: z.string(),
    guest_id: z.string(),
    property_id: z.string().nullable().optional(),
    last_message_at: z.string().nullable().optional(),
    target_user_id: z.string().nullable().optional(),
    created_at: z.string().nullable().optional(),
    property_name: z.string().nullable().optional(),
    guest_name: z.string().nullable().optional(),
    guest_phone: z.string().nullable().optional(),
});

export const MessageSchema = z.object({
    id: z.string(),
    conversation_id: z.string(),
    content: z.string(),
    type: z.string().nullable().optional(),
    direction: z.string(),
    created_at: z.string(),
});

export type Conversation = z.infer<typeof ConversationSchema>;
export type Message = z.infer<typeof MessageSchema>;

export const useConversations = () => {
    return useApiQuery<{ conversations: Conversation[] }>({
        queryKey: ["admin_guest_conversations"],
        path: "/api/v1/guest-inbox/admin/conversations",
        schema: z.object({
            conversations: z.array(ConversationSchema),
        }),
    });
};

export const useConversationMessages = (conversationId: string | null) => {
    return useApiQuery<{ messages: Message[] }>({
        queryKey: ["admin_guest_messages", conversationId],
        path: `/api/v1/guest-inbox/admin/conversations/${conversationId}/messages`,
        schema: z.object({
            messages: z.array(MessageSchema),
        }),
        enabled: !!conversationId,
    });
};

export const useSendMessage = () => {
    return useApiMutation<{ success: boolean; data_or_error?: unknown }, { conversation_id: string; content: string; channel?: string }>({
        method: "POST",
        path: "/api/v1/guest-inbox/outbound",
        schema: z.any(),
    });
};
