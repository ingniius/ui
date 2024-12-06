# CHANGESET
changeset.add:
	@pnpm changeset add
changeset.version:
	@pnpm changeset version
changeset.publish:
	@pnpm changeset publish

# TURBO
turbo.run:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS))
turbo.mod:
	@pnpm turbo gen nuxt $(filter-out $@,$(MAKECMDGOALS))
turbo.dry:
	@pnpm turbo clean && rm -rf .turbo node_modules

%:
	@: