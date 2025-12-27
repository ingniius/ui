bump-deps:
	@pnpx npm-check-updates --deep -u

# ----------------------------------------
# Turbo commands
# ----------------------------------------
TURBO_CMD = pnpm turbo

turbo.boundaries:
	@$(TURBO_CMD) boundaries
turbo.dry:
	@pnpm run-s clean dry

%:
	@: