export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          tokens: number
          elo: number
          wins: number
          losses: number
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          tokens?: number
          elo?: number
          wins?: number
          losses?: number
          is_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          tokens?: number
          elo?: number
          wins?: number
          losses?: number
          is_admin?: boolean
        }
      }
      matches: {
        Row: {
          id: string
          player1_id: string
          player2_id: string | null
          stake: number
          status: 'waiting' | 'in_progress' | 'completed' | 'cancelled'
          winner_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          player1_id: string
          player2_id?: string | null
          stake: number
          status?: 'waiting' | 'in_progress' | 'completed' | 'cancelled'
          winner_id?: string | null
          created_at?: string
        }
        Update: {
          player2_id?: string | null
          status?: 'waiting' | 'in_progress' | 'completed' | 'cancelled'
          winner_id?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'match_win' | 'match_loss' | 'admin_credit'
          amount: number
          status: 'pending' | 'completed' | 'failed'
          tx_hash: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'match_win' | 'match_loss' | 'admin_credit'
          amount: number
          status?: 'pending' | 'completed' | 'failed'
          tx_hash?: string | null
          created_at?: string
        }
        Update: {
          status?: 'pending' | 'completed' | 'failed'
          tx_hash?: string | null
        }
      }
    }
  }
}
