#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod Aurum {
    use super::*;

  pub fn close(_ctx: Context<CloseAurum>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.Aurum.count = ctx.accounts.Aurum.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.Aurum.count = ctx.accounts.Aurum.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeAurum>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.Aurum.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeAurum<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Aurum::INIT_SPACE,
  payer = payer
  )]
  pub Aurum: Account<'info, Aurum>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseAurum<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub Aurum: Account<'info, Aurum>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub Aurum: Account<'info, Aurum>,
}

#[account]
#[derive(InitSpace)]
pub struct Aurum {
  count: u8,
}
