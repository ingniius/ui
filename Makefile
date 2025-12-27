bump-deps:
	@pnpx npm-check-updates --deep -u

# ----------------------------------------
# Changeset commands
# ----------------------------------------
CHAGENSET_CMD = pnpm changeset

changeset.add:
	@$(CHAGENSET_CMD) add
changeset.version:
	@$(CHAGENSET_CMD) version
changeset.publish:
	@$(CHAGENSET_CMD) publish

# ----------------------------------------
# Turbo commands
# ----------------------------------------
TURBO_CMD = pnpm turbo

turbo.boundaries:
	@$(TURBO_CMD) boundaries
turbo.pkg:
	@$(TURBO_CMD) gen pkg --args $(filter-out $@,$(MAKECMDGOALS))
turbo.dry:
	@pnpm run-s clean dry

%:
	@: